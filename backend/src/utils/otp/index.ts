export const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

export const generateExpiryDate = (time: number) => {
    return new Date(Date.now() + time)
}