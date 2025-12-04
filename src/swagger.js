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