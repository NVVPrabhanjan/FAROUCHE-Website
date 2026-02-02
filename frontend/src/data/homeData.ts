import { HostelGroup, Committee } from "../types/home";

export const hostelLeadership: HostelGroup[] = [
    {
        title: "Council of  Wardens",
        description: "Faculty core commitee",
        members: [
            {
                name: "Dr. Bheemsha Arya",
                role: "Working Chairman, BMSETH ",
                image: "/pr-1.png",
                description: "",
            },
            {
                name: "Dr. Rahul R",
                role: "Secretary - NH, BMSETH",
                image: "/s-1.png",
                description: "",
            },
            {
                name: "Dr.Boddapati Venkatesh",
                role: "Secretary - IH, BMSETH",
                image: "/sr-3.jpg",
                description: "",
            },

            {
                name: "Dr. Srinidhi M",
                role: "Joint Secretary - NH",
                image: "/j-1.png",
                description: "",
            },
            {
                name: "Smt Archana K",
                role: "Joint Secretary - NH",
                image: "/j-2.jpeg",
                description: "",
            },
            {
                name: "Hadagali Ashoka",
                role: "Joint Secretary - IH",
                image: "/j-3.jpeg",
                description: "",
            }

        ],
    },
    {
        title: "Hostel Wardens",
        description: "Faculty members overseeing hostel management",
        members: [
            {
                name: "Dr. Bandaru Mallikarjuna",
                role: "Mess Warden",
                image: "/w-1.jpg",
                description: "",
            },
            {
                name: "Dr. Sreenivasamurthy A",
                role: "Hostel Warden",
                image: "/w-2.jpeg",
                description: "",
            },
            {
                name: "Dr. Chetan Raj D",
                role: "Hostel Warden",
                image: "/w-3.jpeg",
                description: "",
            },
            {
                name: "Dr. Latha H N",
                role: "Hostel Warden",
                image: "/w-4.jpeg",
                description: "",
            },
            {
                name: "Sri Harish V Mekali",
                role: "Hostel Warden",
                image: "/w-5.jpeg",
                description: "",
            },
            {
                name: "Dr. Ambika K",
                role: "Hostel Warden",
                image: "/w-6.jpeg",
                description: "",
            },
            {
                name: "Dr. Shekar M",
                role: "Hostel Warden",
                image: "/w-7.jpg",
                description: "",
            },
            {
                name: "Dr. Shyamala G",
                role: "Hostel Warden",
                image: "/w-8.jpeg",
                description: "",
            },
            {
                name: "Dr. Madhusudhan K N",
                role: "Hostel Warden",
                image: "/w-9.jpg",
                description: "",
            },
            {
                name: "SRI. JOHN",
                role: "Administrative Officer",
                image: "/ao-1.png",
                description: "",
            }
        ],
    },
];

export const committees: Committee[] = [
    {
        name: "Core",
        students: 11,
        featured: true,
        description: "Leading the vision and execution of Farouche",
        images: [
            { src: "/co-1.jpg", caption: "Akshanth" },
            { src: "/co-2.jpg", caption: "Anshu" },
            { src: "/co-3.jpg", caption: "Ayush" },
            { src: "/co-4.JPG", caption: "Sachidananda" },
            { src: "/co-5.jpg", caption: "Chirag" },
            { src: "/co-6.jpg", caption: "Soumya" },
            { src: "/co-7.jpg", caption: "Anushka" },
            { src: "/co-8.jpg", caption: "Sujan" },
            { src: "/co-9.jpg", caption: "Alok" },
            { src: "/co-10.jpg", caption: "Aakash" },
            { src: "/co-11.jpg", caption: "Avani" },
        ],
    },
    {
        name: "Technical",
        students: 2,
        description: "Leading the technical aspects of Farouche",
        images: [
            { src: "/t-1.jpg", caption: "Nithish" },
            { src: "/t-2.png", caption: "Koushik" },
        ],
    },
    {
        name: "Sports",
        students: 9,
        description: "Organizing all sports events for Farouche",
        images: [
            { src: "/s-1.jpg", caption: "Lohit" },
            { src: "/s-2.jpg", caption: "Borish" },
            { src: "/s-3.jpg", caption: "Samith" },
            { src: "/s-4.jpg", caption: "Shahid" },
            { src: "/s-5.jpg", caption: "Tanisha" },
            { src: "/s-7.jpg", caption: "Deeksha" },
            { src: "/s-6.jpg", caption: "Dikshyant" },
            { src: "/s-8.png", caption: "Faraz" },
            { src: "/s-9.jpeg", caption: "Amisha" },
        ],
    },
    {
        name: "Organising",
        students: 5,
        description: "Managing the overall organization of Farouche",
        images: [
            { src: "/o-1.jpg", caption: "Venkatesh" },
            { src: "/o-3.jpg", caption: "Surakshith" },
            { src: "/o-4.jpg", caption: "Chethan" },
            { src: "/o-5.jpg", caption: "Kshitij" },
            { src: "/o-6.png", caption: "Shashank" },
        ],
    },
    {
        name: "Cultural",
        students: 6,
        description: "Coordinating cultural activities for Farouche",
        images: [
            { src: "/c-1.jpg", caption: "Sai Raj" },
            { src: "/c-2.jpg", caption: "Aadishwar" },
            { src: "/c-3.jpg", caption: "Chanchal" },
            { src: "/c-4.jpg", caption: "Varsha" },
            { src: "/c-5.jpg", caption: "Sahil" },
            { src: "/c-6.jpg", caption: "Kareena" },
        ],
    },
    {
        name: "Backdrop",
        students: 5,
        description: "Creating the visual experience of Farouche",
        images: [
            { src: "/b-1.jpg", caption: "Ankith" },
            { src: "/b-2.jpg", caption: "Ananya" },
            { src: "/b-3.jpg", caption: "Gautam" },
            { src: "/b-4.jpg", caption: "Aarin" },
            { src: "/b-5.webp", caption: "Parth" },
        ],
    },
    {
        name: "Food Fiesta",
        students: 5,
        description: "Managing food fiesta for Farouche",
        images: [
            { src: "/f-1.jpg", caption: "Krishn Maloo" },
            { src: "/f-2.jpg", caption: "Sujay" },
            { src: "/f-3.jpg", caption: "Aadhya" },
            { src: "/f-4.jpg", caption: "Hasnain" },
            { src: "/f-5.jpg", caption: "Harsh" },
        ],
    },
    {
        name: "Student Organising",
        students: 3,
        description: "Student representatives coordinating Farouche",
        images: [
            { src: "/so-1.jpg", caption: "Shreyansh" },
            { src: "/so-2.jpg", caption: "Prathik" },
            { src: "/so-3.png", caption: "Robin" },
        ],
    },
];
