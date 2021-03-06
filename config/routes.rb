Rails.application.routes.draw do
  get 'home/index'
  root 'home#index'

  namespace :v1, defaults: { format: :json } do
    post "/translations", to: "translations#create"
    get "/translations", to: "translations#index"
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end
