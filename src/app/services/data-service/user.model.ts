import { BaseDto } from "./base-dto.model";
import { UserRole } from "./user-role.model";
import { v4 as uuidv4 } from 'uuid';


export class UserModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        domain: string,
        firstTime: boolean,
        staffId: number, 
        staff: boolean, 
        projectId: string,
        activeUser: boolean,
        email: string,
        emailKey: string,
        personalEmail: string,
        userName: string,
        displayName: string,
        userRoles: UserRole[],
        title: string,
        signatureName: string,
        signatureRole: string,
        signaturePassword: string,
        signatureUrl: string,
        signaturePath: string,
        signatureFile: string,
        signatureType: string,
        firstName: string,
        lastName: string,
        address: string,
        emailSignature: string,
        avatar: string,
        avatarUrl: string,
        avatarPath: string,
        avatarFile: string,
        avatarType: string,
        background: string,
        linkedIn: string,
        phoneNumbers: PhoneNumber[],
        mobileCountry?: string,
        mobileNo?: string,
        officeNo?: string,
        token?: string,
        web_token?: string,
        tokenDate?: string,
        status?: string,
        settings?: Settings,
        platform?: string,
        selected?: boolean,
        login_at?: string[],
        login_info?: any[],
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.domain = domain;
            this.firstTime = firstTime;
            this.staffId = staffId;
            this.staff = staff;
            this.projectId = projectId;
            this.activeUser = activeUser;
            this.userName = userName;
            this.displayName = displayName;
            this.userRoles = userRoles;
            this.title = title;
            this.signatureName = signatureName;            
            this.signatureRole = signatureRole;
            this.signaturePassword = signaturePassword;
            this.signatureUrl = signatureUrl;
            this.signaturePath = signaturePath;
            this.signatureFile = signatureFile;
            this.signatureType = signatureType;            
            this.firstName = firstName;
            this.lastName = lastName;
            this.address = address;
            this.emailSignature = emailSignature;
            this.email = email;
            this.emailKey = emailKey;
            this.personalEmail = personalEmail;
            this.avatar = avatar;
            this.avatarUrl = avatarUrl;
            this.avatarPath = avatarPath;
            this.avatarFile = avatarFile;
            this.avatarType = avatarType;
            this.background = background;    
            this.linkedIn = linkedIn;
            this.phoneNumbers = phoneNumbers;
            this.mobileCountry = mobileCountry;
            this.mobileNo = mobileNo;
            this.officeNo = officeNo;
            this.token = token;
            this.web_token = web_token;
            this.tokenDate = tokenDate;
            this.status = status;
            this.settings = settings
            this.platform = platform;
            this.selected = selected;
            this.login_at = login_at;
            this.login_info = login_info;
            this.created_at = created_at;
            this.updated_at = updated_at;
            this.deleted_at = deleted_at;
    }
    public id: string;
    public orgId: string;
    public domain: string;
    public firstTime: boolean;
    public staffId: number;
    public staff: boolean;
    public projectId: string;
    public activeUser: boolean;
    public userName: string;
    public displayName: string;
    public userRoles: UserRole[];
    public title: string;
    public signatureName: string;
    public signatureRole: string;
    public signaturePassword: string;
    public signatureUrl: string;
    public signaturePath: string;
    public signatureFile: string;
    public signatureType: string;
    public firstName: string;
    public lastName: string;
    public address: string;
    public emailSignature: string;
    public email: string;
    public emailKey: string;
    public personalEmail: string;
    public avatar: string;
    public avatarUrl: string;
    public avatarPath: string;
    public avatarFile: string;
    public avatarType: string;
    public background: string;
    public linkedIn: string;
    public phoneNumbers: PhoneNumber[];
    public thumb?: string;
    public mobileCountry?: string;
    public mobileNo?: string;
    public officeNo?: string;
    public token?: string;
    public web_token?: string;
    public tokenDate?: string;
    public status?: string;
    public settings?: Settings;
    public platform?: string;
    public selected?: boolean;
    public login_at?: string[];
    public login_info?: any[];
    public created_at?: string;
    public updated_at?: string;
    public deleted_at?: string;

    public static toDto(dto: User): User {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            domain: dto.domain ? dto.domain : '',
            firstTime: dto.firstTime ? dto.firstTime : true,
            staffId: dto.staffId ? dto.staffId : 1,
            staff: dto.staff ? dto.staff : false,
            projectId: dto.projectId ? dto.projectId : '',
            activeUser: dto.activeUser ? dto.activeUser : false,
            userName: dto.userName ? dto.userName : '',
            displayName: dto.displayName ? dto.displayName : '',
            userRoles: dto.userRoles ? dto.userRoles : [],
            title: dto.title ? dto.title : '',
            signatureName: dto.signatureName ? dto.signatureName : '',
            signatureRole: dto.signatureRole ? dto.signatureRole : '',
            signaturePassword: dto.signaturePassword ? dto.signaturePassword : '',
            signatureUrl: dto.signatureUrl ? dto.signatureUrl : '', 
            signaturePath: dto.signaturePath ? dto.signaturePath : '',
            signatureFile: dto.signatureFile ? dto.signatureFile : '',
            signatureType: dto.signatureType ? dto.signatureType : '',
            firstName: dto.firstName ? dto.firstName : '',            
            lastName: dto.lastName ? dto.lastName : '',
            address: dto.address ? dto.address : '',
            emailSignature: dto.emailSignature ? dto.emailSignature : '',
            email: dto.email ? dto.email : '',
            emailKey: dto.emailKey ? dto.emailKey : '',
            personalEmail: dto.personalEmail ? dto.personalEmail : '',
            avatar: dto.avatar ? dto.avatar : '',
            avatarUrl: dto.avatarUrl ? dto.avatarUrl : '',
            avatarPath: dto.avatarPath ? dto.avatarPath : '',
            avatarFile: dto.avatarFile ? dto.avatarFile : '',
            avatarType: dto.avatarType ? dto.avatarType : '',
            background: dto.background ? dto.background : 'images/cards/davesa-card.jpg',
            linkedIn: dto.linkedIn ? dto.linkedIn : '',
            phoneNumbers: dto.phoneNumbers ? dto.phoneNumbers : [],
            mobileCountry: dto.mobileCountry ? dto.mobileCountry : '',
            mobileNo: dto.mobileNo ? dto.mobileNo : '',
            officeNo: dto.officeNo ? dto.officeNo : '',
            token: dto.token ? dto.token : '',
            web_token: dto.web_token ? dto.web_token : '',
            tokenDate: dto.tokenDate ? dto.tokenDate : '',
            status: dto.status ? dto.status : '',
            settings: dto.settings ? dto.settings : null,
            platform: dto.platform ? dto.platform : '',
            selected: dto.selected ? dto.selected : false,
            login_at: dto.login_at ? dto.login_at : [],
            login_info: dto.login_info ? dto.login_info : [],
            created_at: dto.created_at ? dto.created_at : '',
            updated_at: dto.updated_at ? dto.updated_at : '',
            deleted_at: dto.deleted_at ? dto.deleted_at : '',
        };
    }

    public static emptyDto(): User {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            domain: '',
            firstTime: true,
            staffId: 1,
            staff: false,
            projectId: '',
            activeUser: false,
            userName: '',
            displayName: '',
            userRoles: [],
            title: '',
            signatureName: '',
            signatureRole: '',
            signaturePassword: '',
            signatureUrl: '',
            signaturePath: '',
            signatureFile: '',
            signatureType: '',
            firstName: '',
            lastName: '',
            address: '',
            emailSignature: '',
            email: '',
            emailKey: '',
            personalEmail: '',
            avatar: '',
            avatarUrl: '',
            avatarPath: '',
            avatarFile: '',
            avatarType: '',
            background: 'images/cards/davesa-card.jpg',
            linkedIn: '',
            phoneNumbers: [],
            mobileCountry: '',
            mobileNo: '',
            officeNo: '',
            token: '',
            web_token: '',
            tokenDate: '',
            status: '',
            settings: null,
            platform: '',
            selected: false,
            login_at: [],
            login_info: [],
            created_at: date,
            updated_at: date,
            deleted_at: '',

        }

    }

    public static emptySettingsDto(): Settings {
        return {
            name: 'Labellas',
            theme: 'red',
            toolbar: 1,
            stickyMenuToolbar: true,                
            header: 'image',
            rtl: false, 
            adminSidenavIsOpened: true,
            adminSidenavIsPinned: true,
            adminSidenavUserBlock: true,
        
            //additional options
            mainToolbarFixed: false,
            contentOffsetToTop: false,                
            headerBgImage: false,
            headerBgVideo: false
        }

    }
}

export interface User  extends BaseDto {
    id: string;
    orgId: string,
    domain: string;
    firstTime: boolean;
    staffId: number;
    staff: boolean;
    projectId: string;
    activeUser: boolean;
    email: string;
    emailKey: string;
    personalEmail: string;
    userName: string;
    displayName: string;
    userRoles: UserRole[],
    title: string;
    signatureName: string;
    signatureRole: string;
    signaturePassword: string;
    signatureUrl: string;
    signaturePath: string;
    signatureFile: string;
    signatureType: string;
    firstName: string;
    lastName: string;
    address: string;
    emailSignature: string;
    avatar: string;
    avatarUrl: string;
    avatarPath: string;
    avatarFile: string;
    avatarType: string;
    background: string;
    linkedIn: string;
    phoneNumbers: PhoneNumber[];
    mobileCountry?: string;
    mobileNo?: string;
    officeNo?: string;
    token?: string;
    web_token?: string;
    tokenDate?: string;
    status?: string;
    settings?: Settings;
    platform?: string;
    selected?: boolean;
    login_at?: string[];
    login_info?: any[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;    
}

export interface Permissions {
    create: boolean;
    read: boolean;
    update: boolean;
}

export interface PhoneNumber {
    phoneNumber: string;
    label: string;
    country?: string;
}

export interface Country {
    id: string;
    iso: string;
    name: string;
    code: string;
    flagImagePos: string;
}

export interface Settings {
    name: string,
    theme: string,
    toolbar: number,
    stickyMenuToolbar: boolean,                
    header: string,
    rtl: boolean, 
    adminSidenavIsOpened: boolean,
    adminSidenavIsPinned: boolean,
    adminSidenavUserBlock: boolean,

    //additional options
    mainToolbarFixed:boolean,
    contentOffsetToTop:boolean,                
    headerBgImage: boolean,
    headerBgVideo: boolean
}

