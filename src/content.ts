export const routes = [
  { id: "home", label: "Fieldnote", href: "/" },
  { id: "about", label: "Stay + Gather", href: "/about/" },
  { id: "data-table", label: "Bookings", href: "/data-table/" },
  { id: "dashboard", label: "Reports", href: "/dashboard/" },
] as const;

export const stayColumns = [
  { key: "detail", header: "Experience" },
  { key: "room", header: "Field Room" },
  { key: "house", header: "House Stay" },
  { key: "retreat", header: "Full Retreat" },
];
export const stayRows = [
  { detail: "Guests", room: "2", house: "8", retreat: "24" },
  { detail: "Breakfast", room: "Included", house: "Private table", retreat: "Hosted daily" },
  { detail: "Studio access", room: "Shared", house: "Dedicated hours", retreat: "Exclusive" },
  { detail: "Planning support", room: "Concierge", house: "Itinerary", retreat: "Producer" },
  { detail: "From", room: "$340 / night", house: "$1,640 / night", retreat: "$8,900 / day" },
];

export const bookingColumns = [
  { key: "id", header: "Booking", sortable: true, filterable: true },
  { key: "guest", header: "Guest", sortable: true, filterable: true },
  { key: "experience", header: "Experience", sortable: true, filterable: true },
  { key: "arrival", header: "Arrival", sortable: true, filterable: true },
  { key: "nights", header: "Nights", sortable: true, filterable: true },
  { key: "value", header: "Value", sortable: true, filterable: true },
  { key: "status", header: "Readiness", sortable: true, filterable: true },
];
export const bookingRows = [
  { id: "FH-2418", guest: "Nora Vale", experience: "Field Room", arrival: "Sep 04", nights: "3", value: "$1,180", status: "Prepared" },
  { id: "FH-2417", guest: "Morrow Studio", experience: "Full Retreat", arrival: "Sep 06", nights: "2", value: "$17,800", status: "Production call" },
  { id: "FH-2414", guest: "Kento Mori", experience: "House Stay", arrival: "Sep 07", nights: "4", value: "$7,120", status: "Menu review" },
  { id: "FH-2411", guest: "Amina Hart", experience: "Field Room", arrival: "Sep 08", nights: "2", value: "$760", status: "Prepared" },
  { id: "FH-2409", guest: "North & Pine", experience: "Workshop", arrival: "Sep 10", nights: "1", value: "$4,600", status: "Rooming list" },
  { id: "FH-2405", guest: "Luca Stone", experience: "House Stay", arrival: "Sep 12", nights: "3", value: "$5,340", status: "Transfer hold" },
  { id: "FH-2401", guest: "Cedar Group", experience: "Full Retreat", arrival: "Sep 14", nights: "3", value: "$26,700", status: "Prepared" },
  { id: "FH-2398", guest: "Parker Lee", experience: "Field Room", arrival: "Sep 15", nights: "5", value: "$1,790", status: "Dietary note" },
];

export const revenueData = [
  { label: "Rooms", value: 42 },
  { label: "Retreats", value: 31 },
  { label: "Gatherings", value: 18 },
  { label: "Table", value: 9 },
];
export const occupancyData = [
  { label: "September", value: 88 },
  { label: "October", value: 81 },
  { label: "November", value: 74 },
  { label: "December", value: 69 },
];
export const reportColumns = [
  { key: "period", header: "Period" },
  { key: "occupancy", header: "Occupancy" },
  { key: "adr", header: "Average rate" },
  { key: "revenue", header: "Revenue" },
];
export const reportRows = [
  { period: "This week", occupancy: "91%", adr: "$418", revenue: "$82,460" },
  { period: "Next week", occupancy: "84%", adr: "$396", revenue: "$74,810" },
  { period: "September", occupancy: "88%", adr: "$402", revenue: "$318,900" },
  { period: "Q4 on books", occupancy: "72%", adr: "$384", revenue: "$821,400" },
];
