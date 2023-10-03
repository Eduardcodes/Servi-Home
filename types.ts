export type ErrorMsg = {
  message: string
}

export type APIresponse <T> ={
  message: string;
  data: T;
}

export type User = {
  id        :string  
  email     :string  
  password  :string
  username  :string
  createdAt :Date
  addresses :Address[]
  bookings  :Booking[]
}

export type Booking = {
  id        : string        
  user      :User          
  cleanerId? :string
  cleaner?   : Cleaner    
  addressId : string
  address   : Address        
  services  : Service[]  
  status    : string 
  createdAt : Date       
}
export type Cleaner = {
  id       : string   
  username : string
  email    : string   
  password : string
  createdAt: Date
  bookings : Booking[] 
}

export type Address = {
  id     : string   
  detail : string  
  userId : string
  user   : User     
  bookings : Booking[]
}

export type Service = {
  id          :string 
  type        :string 
  description :string
  imageUrl?   :string
  booking     :Booking  
  bookingId   :string
}

export type Review = {
  id      :string 
  title   :string
  name    :string
  content :string
  createdAt: Date 
}

