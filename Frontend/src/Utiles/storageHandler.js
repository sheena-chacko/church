import { jwtDecode } from "jwt-decode"
export const getuserToken=()=>{
    return localStorage.getItem("userToken") || null

}
export const getDecodeData=()=>{
    return localStorage.getItem("userToken")? jwtDecode(localStorage.getItem("userToken")):null
}