import { HostelGroup, Committee } from "../types/home";

export const hostelLeadership: HostelGroup[] = [
    {
        title: "Patrons",
        description: "Student core commitee",
        members: [
            {
                name: "Dr. B S Ragini Narayan",
                role: "Donor Trustee, BMSET",
                image: "/1.jpg",
                description: "",
            },
            {
                name: "Dr. P Dayanad Pai",
                role: "Life Trustee, BMSET",
                image: "/2.jpg",
                description: "",
            },
            {
                name: "Shri Aviram Sharma",
                role: "Trustee, BMSET",
                image: "/3.jpg",
                description: "",
            }
        ],
    },
    {
        title: "Hostel Committee Members",
        description: "Faculty core commitee",
        members: [
            {
                name: "Dr. Bheemsha Arya",
                role: "Working Chairman, BMSET Hostels",
                image: "/pr-1.png",
                description: "",
            },
            {
                name: "Dr. L Ravi Kumar",
                role: "Vice Principal Academics, BMSET Hostels",
                image: "/v-2.jpg",
                description: "",
            },
            {
                name: "Dr. Seshachalam",
                role: "Vice Principal Adminstration, BMSET Hostels",
                image: "/v-3.jpg",
                description: "",
            },
            {
                name: "Shri Prakash D Rao",
                role: "Senior Manager (Finance I), BMSET Hostels",
                image: "/u1.png",
                description: "",
            },
            {
                name: "Shri Sanjeeva B S",
                role: "Director (Finance), BMSET Hostels",
                image: "/u1.png",
                description: "",
            },

            {
                name: "Dr. H S Jagadish",
                role: "Director - ICD, BMSET Hostels",
                image: "/u1.png",
                description: "",
            },
            {
                name: "Shri Rahul R",
                role: "Secretary - National Hostels, BMSET Hostels",
                image: "/s-1.png",
                description: "",
            },
            {
                name: "Dr.Boddapati Venkatesh",
                role: "Secretary - International Hostels, BMSET Hostels",
                image: "/sr-3.jpg",
                description: "",
            }
        ],
    },
    {
        title: "Hostel Members & Wardens",
        description: "Faculty members overseeing hostel management",
        members: [
            {
                name: "Dr. Srinidhi M",
                role: "Joint Secretary - National Hostels, BMSET Hostels",
                image: "/j-1.png",
                description: "",
            },
            {
                name: "Mrs. Archana K",
                role: "Joint Secretary - National Hostels, BMSET Hostels",
                image: "/j-2.jpeg",
                description: "",
            },
            {
                name: "Dr. Hadagali Ashoka",
                role: "Joint Secretary - International Hostels, BMSET Hostels",
                image: "/j-3.jpeg",
                description: "",
            },
            {
                name: "Mr. John Moses",
                role: "Administrative Officer",
                image: "/ao-1.png",
                description: "",
            },
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
                name: "Dr. Sharanappa Chapi",
                role: "Hostel Warden",
                image: "/w-8.jpg",
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
            { src: "/c-1.jpg", caption: "Pranav Baddur" },
            { src: "/c-2.jpeg", caption: "Devanshi Slathia" },
            { src: "/c-10.jpeg", caption: "Sanchit Singla" },
            { src: "/c-3.jpg", caption: "Sanket Sangolagi" },
            { src: "/c-4.jpeg", caption: "Shivaputra Arya" },
            { src: "/c-5.jpeg", caption: "Siri Nandihalli" },
            { src: "/c-6.jpg", caption: "Vansh Nagpal" },
            { src: "/c-11.jpeg", caption: "Aditya" },
            { src: "/c-7.jpeg", caption: "Firas K M" },
            { src: "/c-8.jpeg", caption: "Ritual Singh" },
            { src: "/c-9.jpg", caption: "SumitKr Chaudhary" },
        ],
    },
    {
        name: "Web Development ",
        students: 2,
        description: "Leading the technical aspects of Farouche",
        images: [
            { src: "/d-1.png", caption: "Prabhanjan" },
            { src: "/d-2.jpg", caption: "Hitesh R" },
        ],
    },
    {
        name: "Sports",
        students: 8,
        description: "Organizing all sports events for Farouche",
        images: [
            { src: "/s-8.jpeg", caption: "Nishanth" },
            { src: "/s-1.jpeg", caption: "Shashank" },
            { src: "/s-2.jpg", caption: "Syed Amaan" },
            { src: "/s-3.jpg", caption: "Zaid Khursheed" },
            { src: "/s-4.jpeg", caption: "Chris D T" },
            { src: "/s-5.jpeg", caption: "Himani" },
            { src: "/s-6.jpeg", caption: "Nehaarika M" },
            { src: "/s-7.jpeg", caption: "Shambhu Sah" },
        ],
    },
    {
        name: "Organising",
        students: 10,
        description: "Managing the overall organization of Farouche",
        images: [
            { src: "/u1.png", caption: "Aayush" },
            { src: "/o-1.jpg", caption: "Anuj Karun Kumar" },
            { src: "/o-2.jpg", caption: "Ashray K A" },
            { src: "/o-3.jpg", caption: "Bhargav K S" },
            { src: "/o-8.jpeg", caption: "Sai Gagan" },
            { src: "/u1.png", caption: "Vikas Patil" },
            { src: "/o-5.jpg", caption: "VinayYele" },
            { src: "/o-6.jpg", caption: "Yash" },
            { src: "/o-7.jpg", caption: "Ammar Yazdani" },
            { src: "/u1.png", caption: "Surya" },
        ],
    },
    {
        name: "Cultural",
        students: 6,
        description: "Coordinating cultural activities for Farouche",
        images: [
            { src: "/cl-1.jpg", caption: "Arpan" },
            { src: "/cl-2.jpg", caption: "Chahat Singh" },
            { src: "/cl-3.jpg", caption: "Sahil Dutta" },
            { src: "/cl-4.jpg", caption: "Shefali Ballal" },
            { src: "/cl-5.jpeg", caption: "Nakul Dhole" },
            { src: "/cl-6.jpeg", caption: "Roseanne Maharjan" },
        ],
    },
    {
        name: "Backdrop",
        students: 4,
        description: "Creating the visual experience of Farouche",
        images: [
            { src: "/b-1.jpg", caption: "Manasi Naik" },
            { src: "/b-3.jpeg", caption: "Revanth K" },
            { src: "/j-3.jpg", caption: "Aqib Feroz" },
            { src: "/b-2.jpeg", caption: "Tanisha Kharkia" },
        ],
    },
    {
        name: "Food Fiesta",
        students: 4,
        description: "Managing food fiesta for Farouche",
        images: [
            { src: "/f-1.jpeg", caption: "Aastha Priya" },
            { src: "/f-2.jpeg", caption: "Rishabh Kumar" },
            { src: "/f-3.jpg", caption: "Rubah Sheriff" },
            { src: "/f-4.jpg", caption: "Sarthak Gupta" },
        ],
    },
];
