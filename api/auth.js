export default function handler(req, res) {
    const { GITHUB_CLIENT_ID } = process.env;
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo,user`);
}
