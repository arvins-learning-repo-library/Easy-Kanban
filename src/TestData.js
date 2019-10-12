import getRandomId from "./App"

export default testData = {
    tasks: [
        { id: 1, text: "Finish scrimba.com course" },
        { id: 2, text: "Re-price your apps" },

        { id: 3, text: "Record a Youtube video" },
        { id: 4, text: "Edit a video" },
        { id: 5, text: "Upload a video" },

        { id: 6, text: "Kanban app UI" },
        { id: 7, text: "Kanban app logic" },

        { id: 8, text: "Create a news app" },
        { id: 9, text: "Learn Adobe XD" },
    ],

    columns: [
        { title: "💭 Backlog", tasksIds: [8, 9] },
        { title: "👨‍🏭 TODO", tasksIds: [3, 4, 5] },
        { title: "💪 Working", tasksIds: [6, 7] },
        { title: "🙌 Done", tasksIds: [1, 2] },
    ]

}