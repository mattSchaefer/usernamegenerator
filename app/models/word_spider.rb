class WordSpider < Kimurai::Base
    @name = "word_spider"
    @engine = :mechanize
    @start_urls = ["https://richardharringtonblog.com/list-of-nouns/"]
    def self.process(url)
        @start_urls = [url]
        self.crawl!
    end
    def parse(response, url, data: {})
        results = response.xpath("//div[@class='entry-content']//ul/li").map do |li|
            # item = {}
            w = Word.new
            w.word_type = "noun"
            w.value = li.text
            w.save!
            # item[:type] = "noun"
            # item[:value] = li.text
            # puts li.text
            puts li.text
            #save_to "scraped_nouns.json", response, format: :json
        end
    end
    #WordSpider.crawl!
end