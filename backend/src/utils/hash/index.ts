import bcrypt from "bcryptjs"

export const HashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10)
}

export const VerifyPassword = async (password: string, hash: string)=>{
    return await bcrypt.compare(password,hash)
}