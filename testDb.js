var changeLogRepo = require("./repositories/changeLogRepository");
var uploadLogRepo = require("./repositories/uploadLogRepository");
changeLogRepo.createChangeLog({
    uploadID: "abc",
    email : "abhishek.sin@media.net",
    "changeLog" : "bug fix"
});
uploadLogRepo.createUploadLog({
    uploadID: "asfffffffffffffffffffffffff",
    datetime: new Date(),
    jenkinsRef: "13214",
    type: "1"
});
