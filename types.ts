type User = {
  id        :String  
  email     :String  
  password  :String
  username  :String
  createdAt :Date
  addresses :Address[]
  bookings  :Booking[]
}

type Booking = {
  id        : String        
  user      :User          
  cleanerId? :String
  cleaner?   : Cleaner    
  addressId : String
  address   : Address        
  services  : Service[]  
  status    : String 
  createdAt : Date       
}
type Cleaner = {
  id       : String   
  username : String
  email    : String   
  password : String
  createdAt: Date
  bookings : Booking[] 
}

type Address = {
  id     : String   
  detail : String  
  userId : String
  user   : User     
  bookings : Booking[]
}

type Service = {
  id          :String 
  type        :String 
  imageUrl?   :String
  booking     :Booking  
  bookingId   :String
}

type Review = {
  id      :String 
  title   :String
  name    :String
  content :String
  createdAt: Date 
}
