import { 
    Controller, 
    Post, 
    Body, 
    UseGuards, 
    Get,
    Request,
    HttpCode,
    HttpStatus
  } from '@nestjs/common';
  import { AuthService } from '../services/auth.service';
  import { JwtAuthGuard } from '../guards/jwt-auth.guard';
  import { RolesGuard } from '../guards/roles.guard';
  import { Roles } from '../decorators/roles.decorator';
  import { Public } from '../decorators/public.decorator';
  import { LoginDto } from '../dto/login.dto';
  import { RegisterDto } from '../dto/register.dto';
  import { UserRole } from '../entities/user.entity';
  
  // Add interface for Request with user
  interface RequestWithUser extends Request {
    user: {
      id: string;
      email: string;
      role: UserRole;
    }
  }
  
  @Controller('auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto) {
      return this.authService.login(
        loginDto.email, 
        loginDto.password,
        loginDto.tenantDomain
      );
    }
  
    @Public()
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() registerDto: RegisterDto) {
      return this.authService.register(registerDto);
    }
  
    @Get('profile')
    getProfile(@Request() req: RequestWithUser) {
      return req.user;
    }
  
    @Get('admin-dashboard')
    @Roles(UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN)
    getAdminDashboard(@Request() req: RequestWithUser) {
      return {
        message: 'Welcome to admin dashboard',
        user: req.user
      };
    }
  }