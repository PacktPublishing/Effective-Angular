import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ModelAdapter } from './model-adapter.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericHttpService<T, S> {

  protected url;
  defaultHeaders = new HttpHeaders();

  protected readonly httpClient = inject(HttpClient);

  constructor(
    private endpoint: string,
    private baseUrl: string,
    private adapter: ModelAdapter<T, S>
  ) {
    this.url = this.baseUrl + '/api' + this.endpoint;
  }

  public get(extraHttpRequestParams?: unknown): Observable<S> {
    return this.httpClient.get(`${this.url}`, this.prepareRequestOptions(extraHttpRequestParams)).pipe(map(data => this.adapter.fromDto(data as T) as S)) as Observable<S>;
  }

  public getById(id: number | string, extraHttpRequestParams?: unknown): Observable<S> {
    return this.httpClient.get(`${this.url}/${id}`, this.prepareRequestOptions(extraHttpRequestParams)).pipe(map(data => this.adapter.fromDto(data as T) as S)) as Observable<S>;
  }

  public postCreate(body: S, extraHttpRequestParams?: unknown): Observable<S> {
    return this.httpClient.post(`${this.url}`, this.adapter.toDto(body), this.prepareRequestOptions(extraHttpRequestParams)).pipe(map(data => this.adapter.fromDto(data as T) as S)) as Observable<S>;
  }

  public put(body: S, extraHttpRequestParams?: unknown): Observable<S> {
    return this.httpClient.put(`${this.url}`, this.adapter.toDto(body), this.prepareRequestOptions(extraHttpRequestParams)).pipe(map(data => this.adapter.fromDto(data as T) as S)) as Observable<S>;
  }

  public delete(id: number | string, extraHttpRequestParams?: unknown): Observable<S> {
    return this.httpClient.delete(`${this.url}/${id}`, this.prepareRequestOptions(extraHttpRequestParams)).pipe(map(data => this.adapter.fromDto(data as T) as S)) as Observable<S>;
  }

  public prepareRequestOptions(extraHttpRequestParams?: unknown): unknown {
    let requestOptions = {
      headers: this.defaultHeaders
    };

    if (extraHttpRequestParams) {
      requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
    }

    return requestOptions;
  }

}
