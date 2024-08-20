export interface Item {
    topicID: string;
    name: string;
    description: string;
    price_amount: number;
    item_images: string[];
    location: string;
    _id: string;
    creationTime: number;
}


export interface Bid {
    account: string;
    bid_amount: number;
    topicID: string;
    _creationTime: number;
    _id: string;

}