/**
 * Created by pritam on 24/9/16.
 */
var util = require('./util.js');
var getBranchName = function (gitResponse) {
    var ref = gitResponse.ref.split('/');
    return ref[ref.length - 1] || '';
};
var isPushToMaster = function (gitResponse) {
    return getBranchName(gitResponse) === 'master';
};
var isPushToRelease = function (gitResponse) {
    return getBranchName(gitResponse) === 'release';
}

var parseCommits = function (commits) {
    if (util.isArray(commits) && commits.length > 0) {
        util.each(commits, function (commit) {
            console.log(commit.message);
        });
    }
};
var parseGitResponseObject = function (response) {
    var parsedResponse = {};
    parsedResponse.name = response.user_name;
    parsedResponse.emailId = response.user_email;
    parsedResponse.adName = response.user_email.split('@')[0] || '';
    parsedResponse.branchName = getBranchName(response);
    parsedResponse.totalCommits = response.total_commits_count;
    return parsedResponse;
};

var gitResponseParser = {
    isPushToMaster: isPushToMaster,
    parseGitResponseObject: parseGitResponseObject,
    isPushToRelease: isPushToRelease,
    parseCommits: parseCommits

};

module.exports = gitResponseParser;