import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import {
  ApolloModule,
  APOLLO_NAMED_OPTIONS,
  APOLLO_OPTIONS,
} from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { GraphqlService } from './graphql.service';

const errorLink = onError(({ graphQLErrors, networkError}) => {
  // React only on graphql errors
  if (graphQLErrors && graphQLErrors.length > 0) {
    console.error(`[Client side error]: ${graphQLErrors[0].message}`)
    
  }
  if (networkError) {
    // handle network error
    console.error(`[Network error]: ${networkError.message}`);
  }
});

const token = ""
const basicContext = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Accept: 'charset=utf-8',
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
});
export function createDefaultApollo(
  httpLink: HttpLink
): ApolloClientOptions<any> {
  const cache = new InMemoryCache({});

  // create http
  const http = httpLink.create({
    uri: 'http://localhost:8080/graphql',
  });

  return {
    assumeImmutableResults: true,
    cache,
    link: ApolloLink.from([basicContext, errorLink, http]),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
    },
  };
}

@NgModule({
  declarations: [],
  imports: [CommonModule, BrowserModule, HttpClientModule, ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createDefaultApollo,
      deps: [HttpLink],
    },
    GraphqlService
  ],
})
export class GraphqlModule {}
