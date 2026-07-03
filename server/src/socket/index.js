const jwt = require("jsonwebtoken");

io.use((socket, next) => {

    const token = socket.handshake.auth.token;

    if (!token) {
        return next(
            new Error("Unauthorized")
        );
    }

    try {
        socket.user = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        next();

    }

    catch {
        next(
            new Error("Invalid token")
        );
    }
});