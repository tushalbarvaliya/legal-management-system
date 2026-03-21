export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/

export const pinCodeRegex = /^[1-9][0-9]{5}$/
export const phoneNumberRegex = /^\d{10}$/
export const userNameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]+$/
export const nameRegex = /^[A-Z]?[a-z]+$/
export const addressRegex = /^[A-Za-z0-9 ]+$/

export const urlRegex =
  /\b((?:https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}))/gi
