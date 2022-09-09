import {createSlice} from '@reduxjs/toolkit'

const lang = localStorage.getItem('language')

const uzbek = {
    search : "Izlash",
    register : {
        name : 'Ism',
        email : 'E-mail manzili',
        password : 'Parol',
        rePassword : 'Tasdiqlash paroli',
        agreement : "Ro`yxatdan o`tish orqali siz bizning shartlarimizga rozilik bildirasiz.",
        register : "Ro`yxatdan o`tish",
        haveAnAccount : 'Akkauntingiz bormi?',
        notMember : "Akkountingiz yo`qmi?",
        login: "Kirish",
        isBlocked : "Sizning akkountingiz bloklangan",
        checkCredentials : "Kiritilgan ma'lumotlarni tekshiring",
        notFilled : "Hamma maydonlarni to`ldiring"
    },
    admin :{
        admins : 'Adminlar',
        users : 'Foydalanuvchilar',
        name : 'Ism',
        email : "Email",
        isActive : "Faol",
        isBlocked : "Blokda",
        you : "(Siz)",
        unblock : "Ochish",
        block : "Bloklash",
        addAdmin : "Adminlikka saylash",
        removeAdmin : "Admindan chiqarish",
        delete: "O`chirish"

    },
    general : {
        latestItems : "So`nggi buyumlar",
        largestCollections : "Eng katta to`plamlar",
        view : "Ko`rish",
        tagCloud : 'Yorliqlar Bo`limi',
        noTags : "Yorliqlar mavjud emas",
        tags : "Yorliqlar",
        back : "Orqaga",
        edit : "O`zgartirish",
        comments : "Izohlar",
        share : "Ulashish",
        yourComment : "Sizning izohingiz...",
        noComment : "Izohlar mavjud emas",
        like : 'layk',
        s: 'lar',
        item : 'buyum',
        Items : "Buyumlar",
        expCSV : "CSV holatda saqlash",
        collection : "to`plam",
        collections : "To`plamlar",
        sortBy : "Saralash",
        name : "Nomi",
        openHere : "Bu yerni oching",
        modified : "O`zgartirilgan",
        created : "Yaratilgan",
        delete : "O`chirish",
        topic : "Mavzu",
        description : "Tavsif",
        thumbnail : "Tasvir(ixtiyoriy)",
        notChange : "Agar tegilmasa oldingi fayl amalda davom etadi",
        customFields : "Qo`shimcha bo`limlar",
        customInformation : "Qo`shimcha ma`lumotlar",
        type : "Turi",
        text : "Matn",
        number : "Raqam",
        yesNo : "Ha yoki Yo`q",
        multiline : "Ko`p qatorli matn",
        progress: "Jarayon",
        date : "Sana",
        cancel : "Bekor qilish",
        save : "Saqlash",
        create : "Yaratish",
        adminPage : "Admin Bo`limi",
        logOut : "Chiqish",
        yes : "Ha",
        no: "No"
    }
}
const english = {
    search : 'Search',
    register : {
        name : 'Name',
        email : 'E-mail Address',
        password : 'Password',
        rePassword : 'Confirm Password',
        agreement : "By registering you agree with our terms and condition.",
        register : "Register",
        haveAnAccount : 'Already have an account?',
        notMember : "Not a member?",
        login: "Login",
        isBlocked : "Your account is blocked",
        checkCredentials : "Please check the credentials",
        notFilled : "Please fill all the fields"
    },
    admin :{
        admins : 'Admins',
        users : 'Users',
        name : 'Name',
        email : "Email",
        isActive : "Active",
        isBlocked : "Blocked",
        you : '(You)',
        unblock : "Unblock",
        block : "Block",
        addAdmin : "Add Admin",
        removeAdmin : "Remove Admin",
        delete: "Delete"
    },
    general : {
        latestItems : "Latest items",
        largestCollections : "Top largest collections",
        view : "View",
        tagCloud : 'Tag Cloud',
        noTags : "No Tags",
        tags : "Tags",
        back : "Back",
        edit : "Edit",
        comments : "Comments",
        openHere : "Open this select menu",
        share : "Share",
        yourComment : "Your comment...",
        noComment : "No comments yet",
        like : 'like',
        s: 's',
        item : 'item',
        Items : "Items",
        expCSV : "Export to CSV",
        collection : "collection",
        collections : "Collections",
        sortBy : "Sort by",
        name : "Name",
        modified : "Modified",
        created : "Created",
        delete : "Delete",
        topic : "Topic",
        description : "Description",
        thumbnail : "Thumbnail(optional)",
        notChange : "Previous one kept if not changed",
        customFields : "Custom Fields",
        customInformation : "Additional fields",
        type : "Type",
        text : "Text",
        number : "Number",
        yesNo : "Yes or No",
        multiline : "Multiline Text",
        progress: "Progress",
        date : "Date",
        cancel : "Cancel",
        save : "Save",
        create : "Create",
        adminPage : "Admin Page",
        logOut : "Log Out",
        yes : "Yes",
        no : "No",
    }
      
}

const initialState = {
    language : lang ? lang : 'eng',
    langPack : lang === 'uz' ? uzbek : english
}

export const themeSlice = createSlice({
    name : 'theme',
    initialState,
    reducers :{
        changeEng : (state) => {
            state.language = "eng"
        },
        changeUz : (state) => {
            state.language = "uz"
        },
    }
})

export const { changeEng, changeUz } = themeSlice.actions 
export default themeSlice.reducer