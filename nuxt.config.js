import colors from 'vuetify/es5/util/colors'

export default {
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    generate: {
        fallback: true
    },

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: 'wewatch',
        title: 'wewatch',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [{ src: '~/plugins/chart.js', mode: 'client' }],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        'vue-sweetalert2/nuxt'
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // baseURL: 'http://localhost:8000/api/',
        // baseURL: 'https://powerful-beach-80053.herokuapp.com/api/',
        baseURL: 'https://wewatch.dev-ord.tk/api/'
    },
    auth: {

        strategies: {
            local: {
                endpoints: {
                    login: { url: 'master/login', method: 'post', propertyName: 'token' },
                    logout: false,
                    user: { url: 'me', method: 'get', propertyName: 'user' }
                }

            }
        },
        redirect: {
            //   login: '/login',
            logout: '/login',
            //   callback: '/login',
            //   home: '/'
        }
    },
    router: {
        middleware: ['auth', 'acl']
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                light: {
                    primary: '#2d57a3',
                    accent: colors.grey.darken3,
                    secondary: '#fb8505',
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
}