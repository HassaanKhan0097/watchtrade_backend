const admin = "admin";
const buyer = "buyer";
const seller = "seller";
const both = "both";

export default isAdmin = (user) => {
    if(user.userType == admin || user.userType == both){
        return true;
    } else {
        return false;
    }
}