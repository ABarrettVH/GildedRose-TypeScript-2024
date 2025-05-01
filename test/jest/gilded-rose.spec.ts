import { Item, GildedRose } from '@/gilded-rose';
import { specialItems} from "../../app/gilded-rose" ;

describe('Gilded Rose', () => {
  it('correctly assigns name for new item', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  it('quality of new items cannot be < 0', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, -2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('decreases sellIn -1 for non-special item', () => {
    const initialSellIn = 4
    const gildedRose = new GildedRose([new Item('foo', initialSellIn, 4)]);

    const items = gildedRose.updateQuality();
    
    expect(items[0].sellIn).toBe(initialSellIn - 1);
  });

  it('increases +1 quality for Aged Brie item', () => {
    const gildedRose = new GildedRose([new Item(specialItems.AGED_BRIE, 4, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(5);
  });

  it('Special item sulfuras doesn\'t change in quality', () => {
    const gildedRose = new GildedRose([new Item(specialItems.SULFURAS, 4, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(4);
  });

  it('Special item sulfuras doesn\'t change sellIn', () => {
    const gildedRose = new GildedRose([new Item(specialItems.SULFURAS, 4, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
  });

  it('Quality of special item Aged Brie won\'t increase > 50 ', () => {
    const gildedRose = new GildedRose([new Item(specialItems.AGED_BRIE, 4, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it('Quality of items are never below 0 ', () => {
    const gildedRose = new GildedRose([new Item('foo', 4, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('quality of backstage passes increases +1 if more than 10 days', () => {
    const gildedRose = new GildedRose([new Item(specialItems.BACKSTAGE_PASS, 12, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
  });

  it('quality of backstage passes increases +2 if less than 10 days, but more than 5 days', () => {
    const gildedRose = new GildedRose([new Item(specialItems.BACKSTAGE_PASS, 7, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
  });

  it('quality of backstage passes increases +3 less than 5 days', () => {
    const gildedRose = new GildedRose([new Item(specialItems.BACKSTAGE_PASS, 2, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(13);
  });

  it('quality of backstage passes is 0 if sellIn is 0', () => {
    const gildedRose = new GildedRose([new Item(specialItems.BACKSTAGE_PASS, 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
  //quality decreases twice as fast when sellIn is <0
  it('quality of item decreases twice if sellIn is 0', () => {
    const gildedRose = new GildedRose([new Item('foo', -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

});
