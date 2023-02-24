export const API_URL = `${process.env.APP_URL}/api`
export const API_SERVER_URL = `${process.env.API_SERVER_URL}/api`

export const getCategoriesUrl = (string: string) => `/category${string}`

export const getCitiesUrl = (string: string) => `/city${string}`

export const getCardsUrl = (string: string) => `/card${string}`

export const getCommentsUrl = (string: string) => `/comment${string}`

export const getUsersUrl = (string: string) => `/user${string}`

export const getAuthUrl = (string: string) => `/auth${string}`

export const getFormatsUrl = (string: string) => `/format/${string}`

export const getOrdersUrl = (string: string) => `order/${string}`

export const getExUrl = (string: string) => `experience/${string}`

export const getAnswerUrl = (string: string) => `answer/${string}`

export const getRatingUrl = (string: string) => `rating/${string}`

export const getPostsUrl = (string: string) => `/post/${string}`
