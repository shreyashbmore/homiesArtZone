import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIsService {


  constructor(private http: HttpClient) { }

 add_painting(paintingID1:any,imageData:any,paintingName1:any,artistName1:any,size1:any,price1:any,description1:any,available1:any)
 { let sold=0;
   let body={
  PaintingName:paintingName1,
  ImageData:imageData,
  Artist:artistName1,
  Size:size1,
  Description:description1,
  Available:available1,
  Sold:sold,
  PaintingID:paintingID1,
  Price:price1
   }
   
   return this.http.post('https://52pss8ji2i.execute-api.ap-northeast-1.amazonaws.com/devx/admin',body)

 }
 analysis()
 {
  return this.http.get('https://52pss8ji2i.execute-api.ap-northeast-1.amazonaws.com/devx/analysis')

 }



  remove_painting(paintingName2:any)
  {
   
    let params = new HttpParams();
    params = params.append("PaintingName",paintingName2); 
    return this.http.delete('https://52pss8ji2i.execute-api.ap-northeast-1.amazonaws.com/devx/admin', { params: params })
  }

  edit_painting(paintingName3:any){
   
    let params = new HttpParams();
    params = params.append("PaintingName",paintingName3); 
    return this.http.get('https://52pss8ji2i.execute-api.ap-northeast-1.amazonaws.com/devx/admin', { params: params })

  }

  update_painting(body:any)
  {
    return this.http.put('https://52pss8ji2i.execute-api.ap-northeast-1.amazonaws.com/devx/admin',body)

  }

   getAllPaintings(){
    return this.http.get('https://52pss8ji2i.execute-api.ap-northeast-1.amazonaws.com/devx/allpaintings')
   }
   top_paintings(){
    return this.http.get(' https://52pss8ji2i.execute-api.ap-northeast-1.amazonaws.com/devx/top_paintings')
   }
   getUserData(userID:string){
    return this.http.get('https://52pss8ji2i.execute-api.ap-northeast-1.amazonaws.com/devx/userdata?user_id='+userID)
   }
   getPaintingData(paintingID:string){
    return this.http.get('https://52pss8ji2i.execute-api.ap-northeast-1.amazonaws.com/devx/paintingdetails?painting_id='+paintingID)
   }

   addToCart(userID:string,paintingID:string){
    return this.http.get('https://52pss8ji2i.execute-api.ap-northeast-1.amazonaws.com/devx/addtocart?user_id='+userID+'&painting_id='+paintingID)
   }

   removeFromCart(userID:string,paintingID:string){
    return this.http.get('https://52pss8ji2i.execute-api.ap-northeast-1.amazonaws.com/devx/removefromcart?user_id='+userID+'&painting_id='+paintingID)
   }

   purchase_list(userID:string,paintingInfo:string){
    return this.http.get('https://52pss8ji2i.execute-api.ap-northeast-1.amazonaws.com/devx/purchase?user_id='+userID)
   }

   getHomePainting(){
    return this.http.get('https://52pss8ji2i.execute-api.ap-northeast-1.amazonaws.com/devx/homepainting')
   }
}
