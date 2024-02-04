# Mini Project
# Smart Mobile Application


**Description:**
**Description:**
The Smart Home Automation project is designed to provide a comprehensive solution for managing smart homes. The system includes functionalities for user registration, device management, house administration, and inventory tracking. Users can register, add devices to their homes, manage houses, and monitor inventory items.

## Key Features

1. **User Authentication and Registration:**
    - Users can register with the system to access smart home application.
    - Secure authentication mechanisms with JWT token.

2. **Device Management:**
    - Users can register devices from an inventory for personal use.
    - Devices can be added to specific rooms within a house by admin.
    - user of the house can move from one room to other

3. **House Administration:**
    - Users can create houses, becoming admin of their homes.
    - Admins can add other users to their houses.

4. **Inventory Tracking:**
    - The system keeps track of inventory items, providing details like kickstonId, deviceUsername, devicePassword, manufacture date time, and manufacture factory place.

5. **Room Management:**
    - Admin users can add rooms to their houses, enhancing home organization.

6. **Exception Handling:**
    - The project includes a custom exception package with user-defined exceptions and a global exception handler for robust error management.

7. **Security Features:**
    - Token generation and validation filters ensure secure communication.
    - JWT (JSON Web Token) is utilized for secure authentication.

8. **Repository and Service Layers:**
    - The repository package manages data access through repositories.
    - The service layer contains business logic to handle various functionalities.

9. **Util Package:**
    - Utility classes like JwtGenerator contribute to the overall functionality.


## Folder Structure

The project follows a specific folder structure:

- `com.kdu.smarthome`
    - `config`: Contains configuration and security-related files.
    - `controller`: Houses all controllers.
    - `dto`
        - `error`: Error-related Data Transfer Objects (DTOs).
        - `request`: Request-related Data Transfer Objects (DTOs).
        - `response`: Response-related Data Transfer Objects (DTOs).
    - `entity`: Contains all entity classes.
    - `exception`: Custom exceptions and a global exception handler.
        - `custom`: User-defined exceptions.
        - `GlobalExceptionHandler`: Handles global exceptions.
    - `filter`: Contains filters for validation and token generation.
    - `repository`: Houses repositories.
    - `service`: Contains service classes.
    - `util`: Contains utility classes such as `JwtGenerator`, etc.
    - 
## Database Schema Structure

### All Entites

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    name VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email_id VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_date TIMESTAMP,
    deleted_date TIMESTAMP
);

CREATE TABLE house (
    house_id SERIAL PRIMARY KEY,
    address VARCHAR(255),
    house_name VARCHAR(255),
    user_id BIGINT REFERENCES users(user_id),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_date TIMESTAMP,
    deleted_date TIMESTAMP
);

CREATE TABLE room (
    room_id SERIAL PRIMARY KEY,
    room_name VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_date TIMESTAMP,
    deleted_date TIMESTAMP
);

CREATE TABLE device (
    device_id SERIAL PRIMARY KEY,
    kickston_id VARCHAR(255),
    device_username VARCHAR(255),
    device_password VARCHAR(255),
    user_id BIGINT REFERENCES users(user_id),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_date TIMESTAMP,
    deleted_date TIMESTAMP
);

CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    kickston_id VARCHAR(255),
    device_username VARCHAR(255),
    device_password VARCHAR(255),
    manufacture_date_time TIMESTAMP,
    manufacture_factory_place VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_date TIMESTAMP,
    deleted_date TIMESTAMP
);
``` 
## Routes

### AuthController

#### `/api/v1/auth/register` (POST)
- **Description:** User registration.
- **Request Body:** `RegisterRequestDto` - Takes username, password, name, firstname, lastname.
- **Response:** `RegisterResponseDto` - Contains success message and JWT token.

### DeviceController

#### `/api/v1/device/register` (POST)
- **Description:** Registers a device from inventory for a user.
- **Request Body:** `DeviceRegisterRequestDto` - Takes device details like kickstonId, deviceUsername, password.
- **Response:** `DeviceRegisterResponseDto` - Contains message, device details, and HTTP status code.

#### `/api/v1/device/add` (POST)
- **Description:** Adds a device to a room of a house.
- **Request Body:** `AddDeviceRequestDto` - Takes roomId, kickstonId, houseId for adding a device to a house.
- **Response:** `AddDeviceResponseDto` - Contains message, house details, and HTTP status.

### HouseController

#### `/api/v1/house` (POST)
- **Description:** Adds a house for a user; user becomes the admin of that house.
- **Request Body:** `AddHouseRequestDto` - Takes address and house name.
- **Response:** `AddHouseResponseDto` - Returns success message, house details, and status code.

#### `/api/v1/house/{houseId}/add-user` (POST)
- **Description:** Adds a user to a house; only admin can add a user to the house.
- **Path Variable:** `{houseId}` - The house ID.
- **Request Body:** `AddUserToHouseRequestDto` - Contains the username to be added to the house.
- **Response:** `AddUserToHouseResponseDto` - Contains success message, user details, and HTTP status code.

#### `/api/v1/house` (GET)
- **Description:** Retrieves all the houses.
- **Response:** `AllHousesResponseDto` - List of all houses with details of the admin, rooms, devices.

#### `/api/v1/house/{houseId}` (GET)
- **Description:** Retrieves details of a specific house by its ID.
- **Path Variable:** `{houseId}` - The unique identifier of the house.
- **Response:** `HouseByIdResponseDto` - Success message, house details, including devices and rooms within the house.

#### `/api/v1/house` (PUT)
- **Description:** Modifies the address of a house.
- **Request Params:** `houseId` - The ID of the house to be modified.
- **Request Body:** `EditAddressRequestDto` - Contains the new address.
- **Response:** `EditAddressResponseDto` - House details with the modified address, success message, and HTTP status code.

### InventoryController

#### `/api/v1/inventory` (GET)
- **Description:** Retrieves all inventory items.
- **Response:** `GetInventoryResponseDto` - List of inventory items.

#### `/api/v1/inventory` (POST)
- **Description:** Adds a product to the inventory.
- **Request Body:** `AddToInventoryRequestDto` - Takes kickstonId, deviceUsername, devicePassword, manufactureDateTime, manufactureFactoryPlace.
- **Response:** `AddToInventoryResponseDto` - Details of the item added to the inventory.

### RoomController

#### `/api/v1/room` (POST)
- **Description:** Adds a room to a house by an admin user.
- **Request Params:** `houseId` - The house ID.
- **Request Body:** `AddRoomRequestDto` - Contains all the details of the room like room_name to be added.
- **Response:** `AddRoomResponseDto` - Success message, room details, and HTTP status code.


## Authentication and Authorization

### Authenticated Routes
- `/api/v1/device/register` (POST)
- `/api/v1/device/add` (POST)
- `/api/v1/house` (POST)
- `/api/v1/house` (GET)
- `/api/v1/house/{houseId}` (GET)
- `/api/v1/house/{houseId}/add-user` (POST)
- `/api/v1/house` (PUT)
- `/api/v1/inventory` (GET)
- `/api/v1/inventory` (POST)
- `/api/v1/room` (POST)

### Unauthenticated Routes
- `/api/v1/auth/register` (POST)







