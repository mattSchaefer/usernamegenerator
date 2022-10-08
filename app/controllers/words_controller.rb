class WordsController < ApplicationController
    def get_random_noun_and_adjective
        nouns =  Word.where(word_type: "noun")
        num_nouns = nouns.length
        adjectives = Word.where(word_type: "adjective")
        num_adjective = adjectives.length
        random_noun = nouns[rand(num_nouns)].value
        random_adjective = adjectives[rand(num_adjective)].value
        render json: {noun: random_noun, adjective: random_adjective, status: 200}
    end
    def get_random_adjective
        adjectives = Word.where(word_type: "adjective")
        num_adjective = adjectives.length
        random_adjective = adjectives[rand(num_adjective)].value
        render json: {adjective: random_adjective, status: 200}
    end
    def get_random_noun
        nouns =  Word.where(word_type: "noun")
        num_nouns = nouns.length
        random_noun = nouns[rand(num_nouns)].value
        render json: {noun: random_noun, status: 200}
    end
    def get_list_of_adjectives
        adjectives =  Word.where(word_type: "adjective")
        num_adjectives = adjectives.length
        random_adjectives = []
        for i in [1,2,3,4,5,6,7,8,9,10] do
            rand_adjectives_index = rand(num_adjectives)
            random_adjectives.push(adjectives[rand_adjectives_index])
        end
        render json: {adjectives: random_adjectives, status: 200}
    end
    def get_list_of_nouns
        nouns =  Word.where(word_type: "noun")
        num_nouns = nouns.length
        random_nouns = []
        for i in [1,2,3,4,5,6,7,8,9,10] do
            rand_noun_index = rand(num_nouns)
            random_nouns.push(nouns[rand_noun_index])
        end
        render json: {nouns: random_nouns, status: 200}
    end
       
    def get_random_number
        
    end
    def get_random_border
        
    end
    def new
    end
end
