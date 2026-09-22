export type UserRole = "buyer" | "seller" | "agent" | "operator" | "transport" | "admin";
export type Species = "Cattle" | "Goats" | "Sheep" | "Poultry" | "Pigs";
export type VerificationStatus = "Verified" | "Pending" | "Unverified";
export type TradeabilityStatus = "CLEAR TO TRADE" | "PERMIT REQUIRED" | "CAUTION" | "RESTRICTED" | "UNDER REVIEW" | "UNKNOWN";
export type ListingStatus = "Active" | "Pending verification" | "Reserved" | "Sold" | "Draft";
export interface Listing { id:string; title:string; species:Species; breed:string; price:number; location:string; province:string; age:string; weight:string; sex:"Male"|"Female"|"Mixed"; seller:string; sellerId:string; verification:VerificationStatus; tradeability:TradeabilityStatus; status:ListingStatus; image:string; views:number; offers:number; negotiable:boolean; }
export interface Offer { id:string; listingId:string; amount:number; state:"Offered"|"Countered"|"Accepted"|"Declined"; actor:string; time:string; }
export interface Notification { id:string; title:string; detail:string; unread:boolean; path:string; }
export interface Zone { id:string; name:string; province:string; status:"CLEAR"|"CAUTION"|"RESTRICTED"|"CLOSED"|"UNKNOWN"; affected:number; reason:string; }
