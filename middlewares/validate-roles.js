const { response } = require("express")


const isAdminRole = (req, res=response, next) => {
    
    if (!req.userAuth) {
        return res.status(500).json({
            msg: "You want to verify role without validate token first"
        })
    }

    const {role, name} = req.userAuth;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not ADMIN`
        })
    }
    
    
    next();
}

const hasRole = (...roles) => {
    return (req, res=response, next) => {
        if (!req.userAuth) {
            return res.status(500).json({
                msg: "You want to verify role without validate token first"
            })
        }

        const {role, name} = req.userAuth;

        if (!roles.includes(role)) {
            return res.status(401).json({
                msg: `${name} is not authorized for delete users`
            })
        }

        next();

    }
    
    

    
    
    
}

module.exports = {
    isAdminRole,
    hasRole
}