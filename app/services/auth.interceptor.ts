import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import {Injectable} from "@angular/core"
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private loginService: LoginService){}
//implements HttpInterceptor interface,takes two arguments:req(representing outgoing HTTP request) and next(representing the next 'HttpInterceptor' in the chain)   
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
        ): Observable<HttpEvent<any>> {
        //add JWT Token
//creates a new variable 'authReq' and it allows the interceptor to make modifications rather than modifying the original request.       
        let authReq = req; 
//it takes the 'getToken()' method of the loginService to retrieve the JWT Token.        
        const token=this.loginService.getToken();
//means the user is not logged and token is not null        
        if(token!=null){
            console.log('Inside Interceptor with Token');
//the interceptor clones the 'authReq' variable using the clone() method provided by Angular's 'HttpRequest' . Inside the clone() method,the interceptor sets the setHeaders property to add the Authorization header.        
            authReq = authReq.clone({
                setHeaders : {Authorization : 'Bearer '+token},
            });
        }
//the interceptor returns the modified 'authReq' by passing this method.        
        return next.handle(authReq);
    }
    
}
//it is a configurations array provides the 'AuthInterceptor' as an interceptor to Angular's HTTP handling mechanism.It uses the HTTP_INTERCEPTORS constant to specify that this is an HTTP interceptor.The useClass property indicates that the 'AuthInterceptor' class should be used, and multi:true allows multiple interceptors to be provided.
export const authInterceptorProvider=[
    {
        provide : HTTP_INTERCEPTORS,//constant
        useClass : AuthInterceptor,//useClass is a key
        multi : true,
    }
];