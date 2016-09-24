var changeLogRepo = require("./repositories/changeLogRepository")
changeLogRepo.createChangeLog({
    uploadID: "abc",
    email : "abhishek.sin@media.net",
    "changeLog" : "bug fix"
});