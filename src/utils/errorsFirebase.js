export const errorsFirebase = (code) => {
    switch(code){
        case "auth/email-already-in-use":
                return {
                        code: "email",
                        message: "Email already registered",
                }
        case "auth/invalid-email":
                return {
                        code: "email",
                        message: "Email format is invalid",
                }
        case "auth/invalid-credential":
                return {
                        code: "password",
                        message: "Email or password is incorrect",
                }
        case "auth/user-not-found":
                return {
                        code: "password",
                        message: "Email has not been registered",
                }
        default:
            return {
                code: "email",
                message: "There was an error with server connection",
        }
    }
}
