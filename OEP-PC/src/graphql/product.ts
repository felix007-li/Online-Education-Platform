import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
    query GetProducts($page: PageInput!, $name: String) {
        getProducts(page: $page, name: $name) {
            code
            message
            page {
                pageNum
                pageSize
                total
            }
            data {
                id
                limitBuyNumber
                name
                coverUrl
                bannerUrl
                desc
                originalPrice
                stock
                status
                preferentialPrice
            }
        }
    }
`;

export const COMMIT_PRODUCT = gql`
    mutation CommitProductInfo($id: String, $params: PartialProductInput!) {
        commitProductInfo(id: $id, params: $params) {
            code
            message
        }
    }
`;

export const GET_PRODUCT_TYPES = gql`
    query GetProductTypes {
        getProductTypes {
            data {
                key
                title
            }
        }
    }
`;

export const GET_PRODUCT = gql`
    query GetProductInfo($id: String!) {
        getProductInfo(id: $id) {
            code
            message
            data {
                id
                limitBuyNumber
                name
                type
                coverUrl
                bannerUrl
                desc
                status
                originalPrice
                stock
                preferentialPrice
                cards {
                id
                name
                type
                time
                validityDay
                course {
                    name
                    id
                }
                }
            }
        }
    }
`;

export const DELETE_PRODUCT = gql`
    mutation DeleteProduct($id: String!) {
        deleteProduct(id: $id) {
            code
            message
        }
    }
`;
