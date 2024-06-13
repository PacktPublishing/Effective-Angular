import { HttpRequest, HttpHandlerFn, HttpInterceptorFn, HttpEvent, HttpResponse } from "@angular/common/http";
import { isDevMode } from "@angular/core";
import { map } from "rxjs";

export const MockInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  if (!isDevMode()) return next(req);

  const clonedRequest = req.clone({
    url: `assets${req.url}.json`,
    method: 'GET',
  });

  return next(clonedRequest).pipe(
    map((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse && req.method !== 'GET') {
        // Modify the response body here
        return event.clone({ body: req.body });
      }
      return event;
    }));
};
