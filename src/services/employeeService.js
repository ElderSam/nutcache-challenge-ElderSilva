const KEYS = {
    employees: 'employees',
    employeeId: 'employeeId'
}

export const getTeamCollection = () => ([
    { id: '1', title: 'Mobile' },
    { id: '2', title: 'Frontend' },
    { id: '3', title: 'Backend' }
])

export const getGenderCollection = () => ([
        { id: 'masculino', title: 'Masculino' },
        { id: 'feminino', title: 'Feminino' },
        { id: 'outro', title: 'Outro' },
])

export function insertEmployee(data) {
    let employees = getAllEmployees();
    data['id'] = generateEmployeeId()
    employees.push(data)
    localStorage.setItem(KEYS.employees, JSON.stringify(employees))
}

export function updateEmployee(data) {
    let employees = getAllEmployees();
    let recordIndex = employees.findIndex(x => x.id === data.id);
    employees[recordIndex] = { ...data }
    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function generateEmployeeId() {
    if (localStorage.getItem(KEYS.employeeId) == null)
        localStorage.setItem(KEYS.employeeId, '0')
    var id = parseInt(localStorage.getItem(KEYS.employeeId))
    localStorage.setItem(KEYS.employeeId, (++id).toString())
    return id;
}

export function getAllEmployees() {
    if (localStorage.getItem(KEYS.employees) == null)
        localStorage.setItem(KEYS.employees, JSON.stringify([]))
    let employees = JSON.parse(localStorage.getItem(KEYS.employees));
    //map teamID to team title
    let teams = getTeamCollection();
    let auxTeam = "";
    
    return employees.map(x => {
        auxTeam = "";

        if(x.teamId.toString().length > 0)
            auxTeam = teams[x.teamId - 1].title

        return {
        ...x,
        team: auxTeam
        }
    })
}