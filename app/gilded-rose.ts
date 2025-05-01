import { spec } from "node:test/reporters";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    if (quality<0)
      this.quality=0;
    else
      this.quality = quality;
  }
}

export const enum specialItems {
  AGED_BRIE = "Aged Brie",
  BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert",
  SULFURAS = "Sulfuras, Hand of Ragnaros" 
}

export class GildedRose {
  items: Array<Item>;


  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    let special = [specialItems.AGED_BRIE, specialItems.BACKSTAGE_PASS, specialItems.SULFURAS];
    for (let i = 0; i < this.items.length; i++) {
    //   if (!(special.includes(this.items[i].name)) && this.items[i].quality >0){
    //     this.items[i].quality --
    //   }
      if (this.items[i].name != specialItems.AGED_BRIE && this.items[i].name != specialItems.BACKSTAGE_PASS) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != specialItems.SULFURAS) {
            this.items[i].quality = this.items[i].quality - 1
          }
      }
      } 
      else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == specialItems.BACKSTAGE_PASS) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }
      if (this.items[i].name != specialItems.SULFURAS) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != specialItems.AGED_BRIE) {
          if (this.items[i].name != specialItems.BACKSTAGE_PASS) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != specialItems.SULFURAS) {
                this.items[i].quality = this.items[i].quality - 1
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items;
  }
}
