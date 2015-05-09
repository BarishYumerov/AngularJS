app.controller("VideoController", function($scope){

    $scope.video = {};

    $scope.videos = [
        {
            title: 'Course introduction',
            pictureUrl: 'http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg',
            length: '3:32',
            category: 'IT',
            subscribers: 3,
            date: new Date(2014, 12, 15),
            haveSubtitles: false,
            comments: [
                {
                    username: 'Pesho Peshev',
                    content: 'Congratulations Nakov',
                    date: new Date(2014, 12, 15, 12, 30, 0),
                    likes: 3,
                    websiteUrl: 'http://pesho.com/'
                }
            ]
        },
        {
            title: 'ABC Course introduction2',
            pictureUrl: 'http://www.aquieuropa.com/contents/noticias/2012/09/54051-img.jpg',
            length: '13:32',
            category: 'IT2',
            subscribers: 123,
            date: new Date(2014, 12, 15),
            haveSubtitles: true,
            comments: [
                {
                    username: 'Pesho Peshev123',
                    content: 'Congratulations Nako123v',
                    date: new Date(2014, 12, 15, 12, 30, 0),
                    likes: 3,
                    websiteUrl: 'http://pesho.com/123123'
                },
                {
                    username: 'Pesho Peshev123',
                    content: 'Congratulations Nako123v',
                    date: new Date(2014, 12, 15, 12, 30, 0),
                    likes: 3,
                    websiteUrl: 'http://pesho.com/123123'
                }
            ]
        },
        {
            title: 'AngularJS',
            pictureUrl: 'https://angularjs.org/img/AngularJS-large.png',
            length: '120',
            category: 'Study',
            subscribers: 243,
            date: new Date(2014, 12, 15),
            haveSubtitles: true,
            comments: [
                {
                    username: 'Pesho Peshev',
                    content: 'Az sam nomer 1 na angulara vie ste slabi',
                    date: new Date(2014, 12, 15, 12, 30, 0),
                    likes: 3,
                    websiteUrl: 'http://pesho.com/123123'
                },
                {
                    username: 'Nakov',
                    content: 'Mnooogo me kefi angulara',
                    date: new Date(2014, 12, 15, 12, 30, 0),
                    likes: 3,
                    websiteUrl: 'http://pesho.com/123123'
                }
            ]
        }
    ];

    $scope.add = function(video){
        console.log(video);
        $scope.videos.push(video);
        $scope.video = {};
    };
});