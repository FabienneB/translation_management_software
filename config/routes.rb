Rails.application.routes.draw do
  get 'home/index'
  root 'home#index'

<<<<<<< HEAD
  namespace :v1, defaults: { format: :json } do
    post "/translations", to: "translations#create"
    get "/translations", to: "translations#index"
=======
  namespace :v1 do
    post '/translations', to: 'translations#create'
    get '/translations', to: 'translations#index'
>>>>>>> 7c8f3883ec5138f42cace61cd5e28c214a21dba5
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end
