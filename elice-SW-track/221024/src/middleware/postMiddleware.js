const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const checkCompletePostForm = (form) => (req, res, next) => {
    const { title, content, author } = req[form];
    if (title === undefined) {
        new AppError(commonErrors.inputError, 400, `${form}: title은 필수 값입니다.`);
    }
    if (content === undefined) {
        next(new AppError(commonErrors.inputError, 400, `${from}: content는 필수값입니다.`));
    }
    if (author === undefined) {
        next(new AppError(commonErrors.inputError, 400, `${from}: author는 필수값입니다.`));
    }
    next();
};

module.exports = {
    checkCompletePostForm,
};
