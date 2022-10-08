Rails.application.routes.draw do
  root 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/get_random_noun_and_adjective', to: "words#get_random_noun_and_adjective"
  get '/get_random_noun', to: "words#get_random_noun"
  get '/get_random_adjective', to: "words#get_random_adjective"
  get '/get_list_of_nouns', to: 'words#get_list_of_nouns'
  get '/get_list_of_adjectives', to: 'words#get_list_of_adjectives'
end
