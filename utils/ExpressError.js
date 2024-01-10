class ExpressError extends Error {
    constructor(status, messege) {
        super();
        this.status = status;
        this.messege = messege;
    }
}

module.exports = ExpressError;