import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class CInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        //if (environment.production) {
        // const curUrl = window.location.host;
        // const url =
        //   curUrl === environment.curUrl
        //     ? environment.edoUrl
        //     : environment.prodUrl;
        if (req.url.indexOf("/api/") !== -1) {
            req = req.clone({
                setHeaders: { "Access-Control-Allow-Origin": "*" },
                withCredentials: true,
            });
        }
        //}
        return next.handle(req);
    }
}
