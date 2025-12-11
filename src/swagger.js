import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User & Project Management API',
            version: '1.0.0',
            description: 'API documentation for User and Project Management System',
            contact: {
                name: 'API Support',
                email: 'support@example.com'
            }
        },
        servers: [
            {
                url: 'https://nodejs-kair.onrender.com',
                description: 'Production server'
            },
            {
                url: 'http://localhost:3001',
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: ['name', 'email'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Auto-generated MongoDB ObjectId',
                            example: '507f1f77bcf86cd799439011'
                        },
                        name: {
                            type: 'string',
                            description: 'User full name',
                            example: 'John Doe'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address (must be unique)',
                            example: 'john.doe@example.com'
                        },
                        age: {
                            type: 'number',
                            description: 'User age',
                            default: 18,
                            example: 25
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp when user was created'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp when user was last updated'
                        }
                    }
                },
                UserInput: {
                    type: 'object',
                    required: ['name', 'email'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'User full name',
                            example: 'John Doe'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                            example: 'john.doe@example.com'
                        },
                        age: {
                            type: 'number',
                            description: 'User age',
                            example: 25
                        }
                    }
                },
                UserUpdateInput: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'User full name',
                            example: 'John Doe Updated'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                            example: 'john.updated@example.com'
                        },
                        age: {
                            type: 'number',
                            description: 'User age',
                            example: 30
                        }
                    }
                },
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        user: {
                            $ref: '#/components/schemas/User'
                        },
                        message: {
                            type: 'string',
                            example: 'Operation completed successfully'
                        }
                    }
                },
                UsersListResponse: {
                    type: 'object',
                    properties: {
                        users: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/User'
                            }
                        },
                        message: {
                            type: 'string',
                            example: 'Users retrieved successfully'
                        }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Error message',
                            example: 'An error occurred'
                        }
                    }
                },
                NotFoundError: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'User not found'
                        }
                    }
                },
                ValidationError: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Validation failed'
                        }
                    }
                },
                ServerError: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Internal server error'
                        }
                    }
                },
                Project: {
                    type: 'object',
                    required: ['name', 'owner'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Auto-generated MongoDB ObjectId',
                            example: '507f1f77bcf86cd799439011'
                        },
                        name: {
                            type: 'string',
                            description: 'Project name',
                            example: 'Website Redesign'
                        },
                        description: {
                            type: 'string',
                            description: 'Project description',
                            example: 'Complete redesign of company website'
                        },
                        status: {
                            type: 'string',
                            enum: ['pending', 'in-progress', 'completed'],
                            description: 'Project status',
                            default: 'pending',
                            example: 'in-progress'
                        },
                        startDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Project start date',
                            example: '2025-12-04T10:00:00.000Z'
                        },
                        owner: {
                            type: 'object',
                            description: 'Project owner (populated user data)',
                            properties: {
                                _id: {
                                    type: 'string',
                                    example: '507f1f77bcf86cd799439012'
                                },
                                name: {
                                    type: 'string',
                                    example: 'John Doe'
                                },
                                email: {
                                    type: 'string',
                                    example: 'john.doe@example.com'
                                }
                            }
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp when project was created'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp when project was last updated'
                        }
                    }
                },
                ProjectInput: {
                    type: 'object',
                    required: ['name', 'owner'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Project name',
                            example: 'Website Redesign'
                        },
                        description: {
                            type: 'string',
                            description: 'Project description',
                            example: 'Complete redesign of company website'
                        },
                        status: {
                            type: 'string',
                            enum: ['pending', 'in-progress', 'completed'],
                            description: 'Project status',
                            example: 'pending'
                        },
                        startDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Project start date',
                            example: '2025-12-04T10:00:00.000Z'
                        },
                        owner: {
                            type: 'string',
                            description: 'User ID (MongoDB ObjectId) who owns the project',
                            example: '507f1f77bcf86cd799439012'
                        }
                    }
                },
                ProjectUpdateInput: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Project name',
                            example: 'Website Redesign - Updated'
                        },
                        description: {
                            type: 'string',
                            description: 'Project description',
                            example: 'Updated project description'
                        },
                        status: {
                            type: 'string',
                            enum: ['pending', 'in-progress', 'completed'],
                            description: 'Project status',
                            example: 'completed'
                        },
                        startDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Project start date',
                            example: '2025-12-05T10:00:00.000Z'
                        }
                    }
                },
                ProjectSuccessResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Operation completed successfully'
                        },
                        data: {
                            $ref: '#/components/schemas/Project'
                        }
                    }
                },
                ProjectsListResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Lấy danh sách dự án thành công'
                        },
                        data: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Project'
                            }
                        }
                    }
                },
                ProjectErrorResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            example: 'Error message'
                        },
                        errorCode: {
                            type: 'string',
                            example: 'ERROR_CODE'
                        }
                    }
                },
                ProjectNotFoundError: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            example: 'Không tìm thấy dự án'
                        },
                        errorCode: {
                            type: 'string',
                            example: 'PROJECT_NOT_FOUND'
                        }
                    }
                },
                RegisterInput: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'User full name',
                            example: 'John Doe'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                            example: 'john.doe@example.com'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            minLength: 6,
                            description: 'User password (minimum 6 characters)',
                            example: 'password123'
                        },
                        age: {
                            type: 'number',
                            description: 'User age',
                            default: 18,
                            example: 25
                        }
                    }
                },
                LoginInput: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                            example: 'john.doe@example.com'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            description: 'User password',
                            example: 'password123'
                        }
                    }
                },
                AuthSuccessResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Operation completed successfully'
                        },
                        data: {
                            type: 'object',
                            properties: {
                                user: {
                                    type: 'object',
                                    properties: {
                                        _id: {
                                            type: 'string',
                                            example: '507f1f77bcf86cd799439011'
                                        },
                                        name: {
                                            type: 'string',
                                            example: 'John Doe'
                                        },
                                        email: {
                                            type: 'string',
                                            example: 'john.doe@example.com'
                                        },
                                        age: {
                                            type: 'number',
                                            example: 25
                                        },
                                        createdAt: {
                                            type: 'string',
                                            format: 'date-time'
                                        },
                                        updatedAt: {
                                            type: 'string',
                                            format: 'date-time'
                                        }
                                    }
                                },
                                token: {
                                    type: 'string',
                                    description: 'JWT authentication token',
                                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImlhdCI6MTYzMjE0NTIwMCwiZXhwIjoxNjMyNzUwMDAwfQ.xyz123'
                                }
                            }
                        }
                    }
                },
                LoginSuccessResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Đăng nhập thành công'
                        },
                        data: {
                            type: 'object',
                            properties: {
                                user: {
                                    type: 'object',
                                    properties: {
                                        token: {
                                            type: 'string',
                                            description: 'JWT authentication token',
                                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xyz123'
                                        },
                                        user: {
                                            type: 'object',
                                            properties: {
                                                id: {
                                                    type: 'string',
                                                    example: '507f1f77bcf86cd799439011'
                                                },
                                                name: {
                                                    type: 'string',
                                                    example: 'John Doe'
                                                },
                                                email: {
                                                    type: 'string',
                                                    example: 'john.doe@example.com'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                ProfileSuccessResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Lấy thông tin người dùng thành công'
                        },
                        data: {
                            type: 'object',
                            properties: {
                                _id: {
                                    type: 'string',
                                    example: '507f1f77bcf86cd799439011'
                                },
                                name: {
                                    type: 'string',
                                    example: 'John Doe'
                                },
                                email: {
                                    type: 'string',
                                    example: 'john.doe@example.com'
                                },
                                age: {
                                    type: 'number',
                                    example: 25
                                },
                                createdAt: {
                                    type: 'string',
                                    format: 'date-time'
                                },
                                updatedAt: {
                                    type: 'string',
                                    format: 'date-time'
                                }
                            }
                        }
                    }
                },
                AuthErrorResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            example: 'Error message'
                        },
                        errorCode: {
                            type: 'string',
                            example: 'ERROR_CODE'
                        }
                    }
                },
                RefreshTokenSuccessResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Lấy token mới thành công'
                        },
                        accessToken: {
                            type: 'string',
                            description: 'New JWT access token',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImlhdCI6MTYzMjE0NTIwMCwiZXhwIjoxNjMyNzUwMDAwfQ.xyz123'
                        }
                    }
                },
                RefreshTokenErrorResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Refresh token không tồn tại'
                        }
                    }
                },
                LogoutSuccessResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Đăng xuất thành công'
                        }
                    }
                },
                LogoutErrorResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Error message'
                        }
                    }
                }
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT token in format: Bearer <token>'
                }
            }
        }
    },
    apis: ['./src/routes/*.js'] // Path to the API routes files
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};