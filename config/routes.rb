Rails.application.routes.draw do
  #routing logic moved from bottom to top, otherwise the website displays json tea list when the page is manually refreshed in production

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  resources :categories, only: [:index]
  resources :teas, only: [:index, :show, :create] do
    # nested resource for reviews
    # all 5 RESTful routes are used, no need for only:
    resources :reviews
  end
  resources :users, only: [:index, :show]
  
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  get "/auth", to: "users#show"
  delete "/logout", to: "sessions#destroy"

end
