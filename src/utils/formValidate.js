export const formValidate = (getValues) => {
    return{
        required: {
            value: true,
            message: "Required field",
        },
        patternEmail: {
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: "Wrong email format",
        },
        minLengthPass: {
            value: 6, 
            message: "Password must be at least 6 characters long",
        },
        validateTrim: {
            trim: (v) => {
                if (!v.trim()){
                    return "Please, enter a valid password";
                }
                return true;
            },
        },
        validatePassMatch(value) {
            return{
                equals: (v) => v === value || "Passwords doesn't match",
            }
        },
    }
}