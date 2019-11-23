
import React from "react";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardLink,
    CardTitle,
    CardSubtitle,
    Button
} from "reactstrap";
import "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

export default class ProductCard extends React.Component {
    constructor(props) {
        super(props);
    }
    addToCart = e => {
        console.log('addProps', this.props)
        this.props.addItemToCart({
            name: this.props.name,
            price: this.props.price,
            description: this.props.description,
            image: this.props.item_img,
            quantity: 1
        })


    };

    render() {
        return (
            <div>
                <Card
                    style={{
                        padding: "1rem",
                        margin: "1rem",
                        maxHeight: "600px",
                        minWidth: "200px",
                    }}
                >
                    <CardImg
                        top
                        width="100%"
                        src={this.props.item_img}
                        alt="Card image"
                    />
                    <CardBody min-width="500px">
                        <CardTitle>
                            <h4>{this.props.name}</h4>
                        </CardTitle>
                        <CardSubtitle>
                            <h5> {this.props.price}/CZK</h5>
                        </CardSubtitle>
                        <CardText>{this.props.description}</CardText>
                        <Button onClick={this.addToCart}>Buy</Button>
                        <div>
                            <CardLink to="#">More Info</CardLink>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}
