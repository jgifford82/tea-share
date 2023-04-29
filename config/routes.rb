Rails.application.routes.draw do
  
  resources :categories, only: [:index]
  resources :reviews, only: [:index]
  resources :teas, only: [:index]
  resources :users, only: [:index]
  
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  get "/auth", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
