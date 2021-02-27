let BackUrl = null;
let BasiUrl = process.env.VUE_APP_BASIC_API

if (BasiUrl === 'dev') {
    BackUrl = 'dev url'
} else if (BasiUrl === 'qa') {
    BackUrl = 'qa url'
} else if (BasiUrl === 'prod') {
    BackUrl = 'prod url'
}
export default BackUrl