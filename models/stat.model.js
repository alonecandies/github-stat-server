const { Octokit } = require("@octokit/core");

const Stat = function (stat) {
  this.totalCommits = stat.totalCommits;
  this.totalStars = stat.totalStars;
  this.totalWatching = stat.totalWatching;
};

async function getListRepo(org, octokit) {
  return await octokit.request(`GET /orgs/${org}/repos`);
}

async function getCommits(org, repoName, octokit) {
  return await octokit.request(`GET /repos/${org}/${repoName}/commits`);
}

Stat.getTotalStat = async (authToken, org, result) => {
  const octokit = new Octokit({
    auth: authToken,
  });
  try {
    const stat = {};
    const listRepo = await getListRepo(org, octokit);
    stat.name = org;
    stat.totalRepos = listRepo.data.length;
    stat.totalCommits = 0;
    stat.totalStars = 0;
    stat.totalWatching = 0;
    stat.totalForks = 0;
    stat.totalIssues = 0;
    for (let repo of listRepo.data) {
      const commits = await getCommits(org, repo.name, octokit);
      stat.totalCommits += commits.data.length;
      stat.totalStars += repo.stargazers_count;
      stat.totalWatching += repo.watchers_count;
      stat.totalForks += repo.forks_count;
      stat.totalIssues += repo.open_issues_count;
    }
    result(null, stat);
  } catch (err) {
    console.log(err);
    result(err, null);
  }
};

module.exports = Stat;
