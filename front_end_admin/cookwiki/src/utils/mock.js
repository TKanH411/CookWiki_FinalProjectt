import blankImage from "@/assets/images/blank4x3.png";
import avatar from "@/assets/images/avatar.webp";
import stepImage from "@/assets/images/stepImage.webp";

export const dataRecipes = [
    {
        id: 1,
        title: "Spaghetti Carbonara",
        thumbnail: blankImage,
        createBy: {
            avatar: avatar,
            username: "@chefjohn",
            name: "chefjohn"
        },
        createAt: "2023-01-01",
        status: "Draft",
        ingredients: {
            ration: "1 người",
            parts: [{
                name: "Part 1",
                ingredients: [{
                    name: "Mì Spaghetti",
                    amount: "100g"
                }, {
                    name: "Thịt ba chỉ",
                    amount: "100g"
                }, {
                    name: "Trứng gà",
                    amount: "2 quả"
                }]
            }, {
                name: "Part 2",
                ingredients: [{
                    name: "Phô mai Parmesan",
                    amount: "50g"
                }, {
                    name: "Tiêu",
                    amount: "1/2 muỗng cà phê"
                }, {
                    name: "Muối",
                    amount: "1/2 muỗng cà phê"
                }]
            }]
        },
        instructions: {
            time: "2 giờ",
            steps: [{
                description: "Luộc mì Spaghetti trong nước sôi chín, vớt ra, để ráo nước.",
                imgList: [
                    stepImage
                ]
            }, {
                description: "Thái thịt ba chỉ thành từng miếng nhỏ, phi thơm với dầu ăn.",
                imgList: [
                    stepImage,
                    stepImage
                ]
            }, {
                description: "Kết hợp mì Spaghetti với thịt ba chỉ đã phi, trộn đều.",
                imgList: [
                    stepImage
                ]
            }]
        },
        comments: [
            {
                id: 1,
                user: {
                    avatar: avatar,
                    username: "@user1",
                    name: "user1"
                },
                content: "Món này ngon quá, mình đã thử rồi.",
            }, {
                id: 2,
                user: {
                    avatar: avatar,
                    username: "@user2",
                    name: "user2"
                },
                content: "Mình cũng thấy món này ngon, mình sẽ thử làm theo cách của bạn.",
                reply: [{
                    id: 3,
                    user: {
                        avatar: avatar,
                        username: "@user1",
                        name: "user1"
                    },
                    content: "Cảm ơn bạn, chúc bạn thành công."
                }, {
                    id: 4,
                    user: {
                        avatar: avatar,
                        username: "@user2",
                        name: "user2"
                    },
                    content: "Cảm ơn bạn, mình sẽ cố gắng."
                }]
            }, {
                id: 5,
                user: {
                    avatar: avatar,
                    username: "@user3",
                    name: "user3"
                },
                content: "Mình thấy món này không ngon lắm, mình không thích.",
            }, {
                id: 6,
                user: {
                    avatar: avatar,
                    username: "@user4",
                    name: "user4"
                },
                content: "Mình thấy món này ngon, mình sẽ thử làm theo cách của bạn.",
                reply: [{
                    id: 7,
                    user: {
                        avatar: avatar,
                        username: "@user3",
                        name: "user3"
                    },
                    content: "Cảm ơn bạn, chúc bạn thành công."
                }, {
                    id: 8,
                    user: {
                        avatar: avatar,
                        username: "@user4",
                        name: "user4"
                    },
                    content: "Cảm ơn bạn, mình sẽ cố gắng."
                }]
            }, {
                id: 9,
                user: {
                    avatar: avatar,
                    username: "@user5",
                    name: "user5"
                },
                content: "Mình thấy món này không ngon lắm, mình không thích.",
            }, {
                id: 10,
                user: {
                    avatar: avatar,
                    username: "@user6",
                    name: "user6"
                },
                content: "Mình thấy món này ngon, mình sẽ thử làm theo cách của bạn.",
                reply: [{
                    id: 11,
                    user: {
                        avatar: avatar,
                        username: "@user5",
                        name: "user5"
                    },
                    content: "Cảm ơn bạn, chúc bạn thành công."
                }, {
                    id: 12,
                    user: {
                        avatar: avatar,
                        username: "@user6",
                        name: "user6"
                    },
                    content: "Cảm ơn bạn, mình sẽ cố gắng."
                }]
            }, {
                id: 13,
                user: {
                    avatar: avatar,
                    username: "@user7",
                    name: "user7"
                },
                content: "Mình thấy món này không ngon lắm, mình không thích.",
            }, {
                id: 14,
                user: {
                    avatar: avatar,
                    username: "@user8",
                    name: "user8"
                },
                content: "Mình thấy món này ngon, mình sẽ thử làm theo cách của bạn.",
            }, {
                id: 15,
                user: {
                    avatar: avatar,
                    username: "@user9",
                    name: "user9"
                },
                content: "Mình thấy món này không ngon lắm, mình không thích.",
            }, {
                id: 16,
                user: {
                    avatar: avatar,
                    username: "@user10",
                    name: "user10"
                },
                content: "Mình thấy món này ngon, mình sẽ thử làm theo cách của bạn.",
            }, {
                id: 17,
                user: {
                    avatar: avatar,
                    username: "@user11",
                    name: "user11"
                },
                content: "Mình thấy món này không ngon lắm, mình không thích.",
            }, {
                id: 18,
                user: {
                    avatar: avatar,
                    username: "@user12",
                    name: "user12"
                },
                content: "Mình thấy món này ngon, mình sẽ thử làm theo cách của bạn.",
            }, {
                id: 19,
                user: {
                    avatar: avatar,
                    username: "@user13",
                    name: "user13"
                },
                content: "Mình thấy món này không ngon lắm, mình không thích.",
            }, {
                id: 20,
                user: {
                    avatar: avatar,
                    username: "@user14",
                    name: "user14"
                },
                content: "Mình thấy món này ngon, mình sẽ thử làm theo cách của bạn.",
            }, {
                id: 21,
                user: {
                    avatar: avatar,
                    username: "@user15",
                    name: "user15"
                },
                content: "Mình thấy món này không ngon lắm, mình không thích.",
                reply: [{
                    id: 22,
                    user: {
                        avatar: avatar,
                        username: "@user13",
                        name: "user13"
                    },
                    content: "Cảm ơn bạn, chúc bạn thành công."
                }, {
                    id: 23,
                    user: {
                        avatar: avatar,
                        username: "@user14",
                        name: "user14"
                    },
                    content: "Cảm ơn bạn, mình sẽ cố gắng."
                }]
            }, {
                id: 22,
                user: {
                    avatar: avatar,
                    username: "@user16",
                    name: "user16"
                },
                content: "Mình thấy món này ngon, mình sẽ thử làm theo cách của bạn.",
            }, {
                id: 23,
                user: {
                    avatar: avatar,
                    username: "@user17",
                    name: "user17"
                },
                content: "Mình thấy món này không ngon lắm, mình không thích.",
            }
        ],
        like: 2000,
        share: 1000
    },
    {
        id: 2,
        title: "Chicken Alfredo",
        thumbnail: blankImage,
        createBy: {
            avatar: avatar,
            username: "@chefanna",
            name: "chefanna"
        },
        createAt: "2023-02-01",
        status: "Pending",
    },
    {
        id: 3,
        title: "Beef Stroganoff",
        thumbnail: blankImage,
        createBy: {
            avatar: avatar,
            username: "@chefmike",
            name: "chefmike"
        },
        createAt: "2023-03-01",
        status: "Published",
    },
    {
        id: 4,
        title: "Vegetable Stir Fry",
        thumbnail: blankImage,
        createBy: {
            avatar: avatar,
            username: "@chefsara",
            name: "chefsara"
        },
        createAt: "2023-04-01",
        status: "Rejected",
    },
    {
        id: 5,
        title: "Fish Tacos",
        thumbnail: blankImage,
        createBy: {
            avatar: avatar,
            username: "@chefemily",
            name: "chefemily"
        },
        createAt: "2023-05-01",
        status: "Draft",
    },
    {
        id: 6,
        title: "Margherita Pizza",
        thumbnail: blankImage,
        createBy: {
            avatar: avatar,
            username: "@chefpaul",
            name: "chefpaul"
        },
        createAt: "2023-06-01",
        status: "Pending",
    },
    {
        id: 7,
        title: "Caesar Salad",
        thumbnail: blankImage,
        createBy: {
            avatar: avatar,
            username: "@chefjane",
            name: "chefjane"
        },
        createAt: "2023-07-01",
        status: "Published",
    },
    {
        id: 8,
        title: "Tom Yum Soup",
        thumbnail: blankImage,
        createBy: {
            avatar: avatar,
            username: "@chefdavid",
            name: "chefdavid"
        },
        createAt: "2023-08-01",
        status: "Rejected",
    },
    {
        id: 9,
        title: "Pad Thai",
        thumbnail: blankImage,
        createBy: {
            avatar: avatar,
            username: "@chefsam",
            name: "chefsam"
        },
        createAt: "2023-09-01",
        status: "Draft",
    },
    {
        id: 10,
        title: "Chicken Curry",
        thumbnail: blankImage,
        createBy: {
            avatar: avatar,
            username: "@chefamy",
            name: "chefamy"
        },
        createAt: "2023-10-01",
        status: "Pending",
    },
    {
        id: 11,
        title: "Beef Tacos",
        thumbnail: blankImage,
        createBy: {
            avatar: avatar,
            username: "@chefmark",
            name: "chefmark"
        },
        createAt: "2023-11-01",
        status: "Published",
    },
    {
        id: 12,
        title: "Pancakes",
        thumbnail: blankImage,
        createBy: {
            avatar: avatar,
            username: "@chefjulia",
            name: "chefjulia"
        },
        createAt: "2023-12-01",
        status: "Rejected",
    },
    {
        id: 13,
        title: "French Toast",
        thumbnail: blankImage,
        createBy: {
            avatar: avatar,
            username: "@chefchris",
            name: "chefchris"
        },
        createAt: "2024-01-01",
        status: "Draft",
    },
    {
        id: 14,
        title: "Eggs Benedict",
        thumbnail: blankImage,
        createBy: {
            avatar: avatar,
            username: "@chefashley",
            name: "chefashley"
        },
        createAt: "2024-02-01",
        status: "Pending",
    },
    {
        id: 15,
        title: "Avocado Toast",
        thumbnail: blankImage,
        createBy: {
            avatar: avatar,
            username: "@chefkevin",
            name: "chefkevin"
        },
        createAt: "2024-03-01",
        status: "Published",
    }
];